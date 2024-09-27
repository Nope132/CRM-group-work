import { reactive } from 'vue';
export default () => {
    const tableLabel = reactive([
        {
            prop: "number",
            label: "编号"
        },
        {
            prop: "addr",
            label: "客户",
            width: '240px'
        },
        {
            prop: "age",
            label: "概要",
        },
        {
            prop: "sexLabel",
            label: "服务类型",
        },
        {
            prop: "name",
            label: "创建人",
            width: 200,
        },
        {
            prop: "birth",
            label: "创建日期",
            width: 320,
        },
    ])
    const serviceForm = reactive({
        id: 456,
        serveType: '咨询',
        overview: '询问收音机订单运费承担方式',
        customer: '太阳药业',
        state: '已分配',
        serveRequest: '收音机订单运费如何承担？',
        createPeople: '小明',
        assigner: '旺财',
        assignTime: '2007年12月02日 15时26分58秒',
        serviceProce: '回电话给刘经理： 根据相关制度，7元/吨*公里内由我们负责，之外由客户负责',
        serviceProcePeople: '郭晓梅',
        serviceProceTime: '2007年12月02日 15时26分58秒',
        serviceProceResult: '处理结果的内容',
        satisfaction: '☆☆☆☆☆',
        isVaild: 0,
        updateDate: '2007年12月02日 15时26分58秒',
        createDate: '2007年12月02日 15时26分58秒'
    })
    const searchForm = reactive({
        customer: '',
        overview: '',
        serveType: 0,
        createDateBegin: '',
        createDateEnd: '',
        state: 0
    })
    return { tableLabel, serviceForm, searchForm }
}