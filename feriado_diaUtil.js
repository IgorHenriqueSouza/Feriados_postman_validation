Object.prototype.dataUtil = (data) => {

    //Domingo
    if (data.getDay() === 0 )
    {
        data.setDate(data.getDate() + 1);
    }
    //sabado
    else if (data.getDay() === 6 )
    {        
        data.setDate(data.getDate() + 2);
    }
    return data;
};

function convertFromStringToDate(pascoa) 
{   
    let dateComponents = pascoa.split('T');
    let datePieces = dateComponents[0].split("-");   
    return(new Date(datePieces[0], (datePieces[1] - 1), datePieces[2]))
}

//Descobre o dia da pascoa de acordo com o ano
function Easter(Y) 
{
    var C = Math.floor(Y / 100);
    var N = Y - 19 * Math.floor(Y / 19);
    var K = Math.floor((C - 17) / 25);
    var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
    I = I - 30 * Math.floor((I / 30));
    I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
    var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
    J = J - 7 * Math.floor(J / 7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40) / 44);
    var D = L + 28 - 31 * Math.floor(M / 4);

    return padout(M) + '' + padout(D);
}

//Acrescenta o numero '0' à esquerda quando mes ou dia tem apenas um caracter
function padout(number) 
{
    return (number < 10) ? '0' + number : number;
}

Object.prototype.feriado = (dataAtual) => {
    var feriados = [];
    var ano = new Date();
    var ano = dataAtual.getFullYear();
    var pascoa = new Date();

    pascoa = ano + Easter(ano);
    var pascoaAno = pascoa.slice(0,4);
    var pascoaMes = pascoa.slice(4,6);
    var pascoaDia = pascoa.slice(6,8);

    //formata a data para YYYY-MM-AA
    pascoa = pascoaAno + '-'+ pascoaMes + '-'+pascoaDia;    

    pascoa = convertFromStringToDate(pascoa);

    //Descobre o dia que cai a segunda-feira de carnaval
    var segCarnaval = new Date(pascoa);
    segCarnaval = new Date (segCarnaval.setDate(segCarnaval.getDate()-48));
    segCarnaval = segCarnaval.toISOString().substring(0, 10);

    //Descobre o dia que cai o carnaval
    var carnaval = new Date(pascoa);
    carnaval = new Date(carnaval.setDate(carnaval.getDate()-47));
    carnaval = carnaval.toISOString().substring(0, 10);

    //Descobre o dia que cai a sexta-feira da paixao
    var sextaSanta = new Date(pascoa);
    sextaSanta = new Date(sextaSanta.setDate(sextaSanta.getDate()-2));
    sextaSanta = sextaSanta.toISOString().substring(0, 10);

    //Descobre o dia que cai o feriado de Corpus Christi
    var corpusChristi = new Date(pascoa);
    corpusChristi = new Date(corpusChristi.setDate(corpusChristi.getDate()+60));
    corpusChristi = corpusChristi.toISOString().substring(0, 10);

    //Carrega o array com os feriados nacionais
    feriados.push({
     data: ano + '-'+'01'+ '-'+'01',
     descricao: 'Confraternização Universal'
    }) 
    feriados.push({
    data:segCarnaval,
    descricao: '2ºfeira Carnaval'
    })
    feriados.push({
    data: carnaval,
    descricao: 'Carnaval'
    })
    feriados.push({
    data: pascoa,
    descricao: 'Páscoa'
    })
    feriados.push({
    data: sextaSanta,
    descricao: '6ºfeira Santa'
    })
    feriados.push({
    data: corpusChristi,
    descricao: 'Corpus Christi'
    })
    feriados.push({
    data: ano + '-'+'04'+ '-'+'21',
    descricao: 'Tiradentes'
    })
    feriados.push({
    data: ano + '-'+'05'+ '-'+'01',
    descricao: 'Dia do Trabalhador'
    })
    feriados.push({
    data: ano + '-'+'09'+ '-'+'07',
    descricao: 'Dia da Independência'
    })
    feriados.push({
    data: ano + '-'+'10'+ '-'+'12',
    descricao: 'N. S. Aparecida'
    })
    feriados.push({
    data: ano + '-'+'11'+ '-'+'02',
    descricao: 'Todos os santos'
    })
    feriados.push({
    data: ano + '-'+'11'+ '-'+'15',
    descricao: 'Proclamação da República'
    })
    feriados.push({
    data: ano + '-'+'12'+ '-'+'25',
    descricao: 'Natal'
    })    

    for (var i = 0; i < feriados.length; i++) 
    {
        if(feriados[i].data == pm.environment.get("dataLancamento"))
        { 
            i = feriados.length;
            dataAtual.setDate(dataAtual.getDate() + 1);
        }        
    }   
    
    return dataAtual;
};









