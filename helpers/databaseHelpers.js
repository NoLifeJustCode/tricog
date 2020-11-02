

function insertQueryBuilder(data ,table){
    let statement=`insert into ${table} (${getColumns(Object.keys(data))}) Values (${getValues(Object.values(data))})`;
    return statement;
}
function getColumns(columns){
    let res="";
    for(let i =0;i<columns.length;i++){
        res+=columns[i];
        if(i+1!=columns.length)
            res+=",";
    }
    return res;
}
function getValues(values){
    let res="";
    for(let i =0;i<values.length;i++){
        res+=`"${values[i]}"`;
        if(i+1!=values.length)
            res+=",";
    }
    return res;
}
function selectQueryBuilder(data){
    let query="select * from "+data.table;
    
    if(data.filter && data.filter.limit)
        {
            data.limit=data.filter.limit;
            delete data.filter.limit;
        }
    const filterKeys=data.filter&&Object.keys(data.filter);
    if(filterKeys && filterKeys.length>0){
        query+=" where ";
        for(let i=0;i<filterKeys.length;i++){
            if(i!=0)
                query+=" AND ";
            query+=`${filterKeys[i]} = "${data.filter[filterKeys[i]]}"`;
        }
    }
    if(data.limit)
        query+=` limit  ${data.limit}`;
    return query;
}
module.exports={
    insertQueryBuilder,
    getColumns,
    getValues,
    selectQueryBuilder
}