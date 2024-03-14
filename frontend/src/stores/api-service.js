import axios from "axios"

const host = 'https://container-service-1.mrd573o2aajr6.eu-west-3.cs.amazonlightsail.com/api/'
// const host = 'https://partidosdefutbol2-2c7lrv2l.b4a.run/api/'

const API_PARTIDOS = host + "partidos"

function llamadaAPI(method, body, path) {
  let config = {
    method: method ?? "get",
    maxBodyLength: Infinity,
    url: path,
    headers: {}
  }
  if (body) {
    (config.data = body), (config.headers["Content-Type"] = "application/json")
  }
  return axios.request(config)
}

export function cambiarHttpPorHttps(enlace) {
  return enlace.replace('http', 'https')
}

export function getPartidos() {
  return llamadaAPI("get", null, API_PARTIDOS)
}

export function postPartidos(data) {
  return llamadaAPI("post", data, API_PARTIDOS)
}

export function deleteEntidad(entidad) {
  console.log("En apiservice, antes de delete: ", entidad)
  return llamadaAPI("delete", null, cambiarHttpPorHttps(entidad))
}