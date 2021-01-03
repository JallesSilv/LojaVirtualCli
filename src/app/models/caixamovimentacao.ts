export class CaixaMovimentacao{
    chaveCaixaMovimentacao: number;
    chaveCaixa: number;
    chavePessoa: number;
    chavePedido: number;
    chaveFile: number;
    descricao: string;
    dataCadastro: Date = null;
    dataPago: Date = null;
    dataEstorno: Date = null;
    tipoLancamento: boolean;
    fecharCaixaAutomatico: boolean;
    valor: string;
    valorAntecipado: string;
    ativo: boolean;
}