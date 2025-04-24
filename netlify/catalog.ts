import { Handler } from '@netlify/functions';
import { Client, Environment } from 'square';

const client = new Client({
  environment: Environment.Production,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

const handler: Handler = async () => {
  try {
    // 1. Pull every ITEM that is enabled
    const { result } = await client.catalogApi.listCatalog(undefined, 'ITEM');
    if (!result.objects) throw new Error('No catalog objects');

    const items = result.objects
      .filter((o) => o.itemData?.variations?.[0]?.itemVariationData?.priceMoney) // price present
      .map((o) => {
        const v = o.itemData!.variations![0].itemVariationData!;
        const category =
          o.itemData?.categoryId === process.env.PROGRAM_CATEGORY_ID
            ? 'program'
            : 'upsell';

        return {
          id: o.id,
          name: o.itemData!.name,
          price: v.priceMoney!.amount / 100, // USD
          category,                          // 'program' | 'upsell'
        };
      });

    return {
      statusCode: 200,
      body: JSON.stringify(items),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: 'Catalog fetch failed' };
  }
};

export { handler };
