import { filtrarResultadosDB } from "../../repository/home/home";

export function filtrarResultados(dataInicio, dataFim, callbackSucess, callbackError) {

    filtrarResultadosDB(dataInicio, dataFim, callbackSucess, callbackError);
}
