import getConfig from "next/config";

const handler = (_, res) => {
  res.status(200).json({ ...getConfig().publicRuntimeConfig });
};
export default handler;
