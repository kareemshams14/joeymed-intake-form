// netlify/functions/catalog.ts – safe priceMoney access
import { Handler } from '@netlify/functions';
import * as Square from 'square';

// ------------------------------------------------------------------
// Square client (SDK v36.x)
// ------------------------------------------------------------------
const client = new Square.Client({
  environment: Square.Environment.Production, // change to .Sandbox for tests
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
});

const handler: Handler = async () => {
  try {
    // Pull every ITEM that has at least one variation with a price
    const { result } = await client.catalogApi.listCatalog(undefined, 'ITEM');

    const items = (result.objects ?? [])
      .map((o) => {
        const v = o.itemData?.variations?.[0]?.itemVariationData;
        const cents = v?.priceMoney?.amount;
        if (!v || cents === undefined) return null; // skip items without a price
        return {
          id: o.id,
          name: o.itemData!.name,
          price: cents / 100, // convert to USD
        };
      })
      .filter(Boolean);

    return {
      statusCode: 200,
      body: JSON.stringify(items),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (err) {
    console.error('[catalog] error', err);
    return { statusCode: 500, body: 'Catalog fetch failed' };
  }
};

export { handler };
