export async function get({ params }) {
  const { redirectKey } = params;
  const url = await KV.get(redirectKey)
  return {
    status: 302,
    headers: {
      Location: url ? url : '/404'
    }
  }
}
