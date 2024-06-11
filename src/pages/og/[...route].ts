import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import CanvasKitInit from 'canvaskit-wasm/full';
import type { GenericCollectionEntry } from '../../utils/sidebar';
import type { APIRoute } from 'astro';
import { createRequire } from 'node:module';
const { resolve } = createRequire(import.meta.url);

const docs = await getCollection('docs');
const kubejs = await getCollection('kubejs');
const spells = await getCollection('spells');

const collectionEntries: GenericCollectionEntry[] = docs.concat(kubejs as any, spells as any);

const pages = Object.fromEntries(collectionEntries.map(({ collection, slug, data }) => [`${collection}/${slug}`, { ...data, collection }]));

const OGImageOutput = OGImageRoute({
  pages: pages,
  param: 'route',
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    border: {
        color: [0, 255, 0],
        width: 20,
        side: "block-start"
    },
    logo: {
        path: "./assets/ars-guide-logo.png",
        size: [1000],
    },
    bgImage: {
        path: "./assets/archwood-bg.png"
    }
  }),
});

const pathToSlug = (path: string): string => {
  path = path.replace(/^\/src\/pages\//, '');
  path = path.replace(/\.[^\.]*$/, '') + '.png';
  path = path.replace(/\/index\.png$/, '.png');
  return path;
};

export const { getStaticPaths } = OGImageOutput;
export const GET: APIRoute = async (context) => {
  const response = await OGImageOutput.GET(context);

  const image = await response.arrayBuffer();
  const defaultResponse = new Response(image);

  if (!context.params.route?.includes("spells")) return defaultResponse;

  const CanvasKit = await CanvasKitInit({
    locateFile: (file) => resolve(`canvaskit-wasm/bin/full/${file}`),
  });

  const surface = CanvasKit.MakeSurface(1200, 630);
  if (!surface) return defaultResponse;

  const canvas = surface.getCanvas();

  const ogImage = CanvasKit.MakeImageFromEncoded(image);
  if (!ogImage) return defaultResponse;
  canvas.drawImage(ogImage, 0, 0);

  // const circlePaint = new CanvasKit.Paint();
  // circlePaint.setColor(CanvasKit.Color(255, 0, 0))
  // const descTop = 510;
  // const descLeft = 60;
  // const radius = 5;
  // canvas.drawCircle(descLeft + radius, descTop + radius, radius, circlePaint);

  const newImage = surface.makeImageSnapshot();
  const newImageBytes = newImage.encodeToBytes(CanvasKit.ImageFormat.PNG, 90)  || new Uint8Array();
  surface.dispose();

  return new Response(Buffer.from(newImageBytes));
}
