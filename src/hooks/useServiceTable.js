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
        id: 0,
        serveType: '',
        overview: '',
        customer: '',
        state: '',
        serveRequest: '',
        createPeople: '',
        assigner: '',
        assignTime: '',
        serviceProce: '',
        serviceProceTime: '',
        serviceProceResult: '',
        satisfaction: '',
        isVaild: 0,
        updateDate: '',
        createDate: ''
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