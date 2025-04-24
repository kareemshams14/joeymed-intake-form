// netlify/functions/catalog.ts
import { Handler } from '@netlify/functions';
import * as Square from 'square';            // ← namespace import works for all 30-series SDKs

// Single client reused for all invocations
const client = new Square.Client({
  environment: Square.Environment.Production,   // or .Sandbox while testing
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
});

const handler: Handler = async () => {
  try {
    const { result } = await client.catalogApi.listCatalog(undefined, 'ITEM');
    if (!result.objects) {
      return { statusCode: 200, body: '[]', headers: { 'Content-Type': 'application/json' } };
    }

    const items = result.objects
      .filter((o) => o.itemData?.variations?.[0]?.itemVariationData?.priceMoney)
      .map((o) => {
        const v = o.itemData!.variations![0]!.itemVariationData!;
        return {
          id: o.id,
          name: o.itemData!.name,
          price: v.priceMoney!.amount / 100,
        };
      });

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
