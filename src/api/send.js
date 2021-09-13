import newaxios from "@/util/myaxios"

let send = {
    //存储京东数据
    saveData(entity){
        return newaxios.post('saveOrUpdateText',entity)}
}

export default send;