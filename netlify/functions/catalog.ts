// netlify/functions/catalog.ts – simplified version (no program / upsell split)

import { Handler } from '@netlify/functions';
import { Client, Environment } from 'square';

// ---------- Square client ---------------------------------------------
const client = new Client({
  environment: Environment.Production, // or Environment.Sandbox
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

/*
  GET /.netlify/functions/catalog
  Returns every active Catalog ITEM that has a price.
  ── [{ id, name, price }] – price is already in USD dollars (number)
*/
const handler: Handler = async () => {
  try {
    const { result } = await client.catalogApi.listCatalog(undefined, 'ITEM');
    if (!result.objects) throw new Error('No catalog objects');

    const items = result.objects
      .filter((o) => o.itemData?.variations?.[0]?.itemVariationData?.priceMoney)
      .map((o) => {
        const variation = o.itemData!.variations![0].itemVariationData!;
        return {
          id: o.id,
          name: o.itemData!.name,
          price: variation.priceMoney!.amount / 100, // convert cents → dollars
        };
      });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    };
  } catch (err) {
    console.error('Catalog fetch failed', err);
    return { statusCode: 500, body: 'Catalog fetch failed' };
  }
};

export { handler };
