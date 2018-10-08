export const DATA_TYPE = {
    TEXT: 'text',
    TEXT_AREA: 'textArea ',
    NUMBER: 'number',
    PHONE: 'phone',
    DATA: 'data',
    IMG: 'IMG',
    SELECT: 'select',
    EDITOR: 'editor',
};

export const DATA_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const OPERATION_TYPE = {
    ADD: 'add',
    EDIT: 'edit',
    LOGIN: 'login',
    REGISTER: 'register',
};

export const MEMBER_TYPE = {
    0: '通过平台添加',
    1: '通过手机号报名',
    2: '通过微信报名',
};

export const REQUEST_TYPE = {
    GIFT: 'gift',
    PRIZE: 'prize',
    MEMBER: 'member',
    DETAIL: 'detail',
};

export const STORAGE = {
    TOKEN: 'SDFLKSMFLKSMFLKSD'
};

export const AC_DETAIL_FORMS = [
    { type: DATA_TYPE.IMG, key: 'shareImg', label: '分享标题', needMessage: false },
    { type: DATA_TYPE.TEXT, key: 'shareTitle', label: '分享题目', needMessage: false },
    { type: DATA_TYPE.TEXT, key: 'shareContent', label: '分享描述', needMessage: false },

    { type: DATA_TYPE.TEXT, key: 'liveRoomId', label: '直播房间号', needMessage: '请查看有像后台的直播房间号' },
    { type: DATA_TYPE.IMG, key: 'imageUrl', label: '封面图', needMessage: '请上传封面图' },
    { type: DATA_TYPE.TEXT, key: 'name', label: '活动名称', needMessage: '请输入活动名称' },
    { type: DATA_TYPE.TEXT, key: 'location', label: '活动地址', needMessage: '请输入活动地址' },
    { type: DATA_TYPE.TEXT, key: 'firstOrganizer', label: '主办单位', needMessage: '请输入主办单位' },
    { type: DATA_TYPE.TEXT, key: 'secondOrganizer', label: '协办单位', needMessage: '请输入协办单位' },
    { type: DATA_TYPE.TEXT, key: 'mediaPartner', label: '媒体合作', needMessage: '请输入媒体合作' },
    { type: DATA_TYPE.DATA, key: 'startDate', label: '开始时间', needMessage: '请输入开始时间' },
    { type: DATA_TYPE.DATA, key: 'endDate', label: '结束时间', needMessage: '请输入结束时间' },
    { type: DATA_TYPE.EDITOR, key: 'detail', label: '活动详情', needMessage: false }, // editor类型，needMessage必须为false
    { type: DATA_TYPE.EDITOR, key: 'selectRule', label: '评选规则', needMessage: false }, // editor类型，needMessage必须为false
];

export const AC_GIFT_FORMS = [
    { type: DATA_TYPE.TEXT, key: 'name', label: '礼物名称', needMessage: '请输入礼物名称' },
    { type: DATA_TYPE.NUMBER, key: 'price', label: '价格', needMessage: '请输入价格' },
    { type: DATA_TYPE.NUMBER, key: 'voteNumber', label: '价值票数', needMessage: '请输入价值票数' },
    { type: DATA_TYPE.NUMBER, key: 'sortd', label: '排序', needMessage: '请输入序号位置' },
    { type: DATA_TYPE.IMG, key: 'iconUrl', label: '图标', needMessage: '请上传图标' },
];

export const AC_PRIZE_FORMS = [
    { type: DATA_TYPE.TEXT, key: 'name', label: '奖项名', needMessage: '请输入奖项名' },
    { type: DATA_TYPE.TEXT, key: 'detail', label: '奖项详情', needMessage: '请输入奖项详情' },
    { type: DATA_TYPE.NUMBER, key: 'sortd', label: '排序', needMessage: '请排序' },
];

export const AC_MEMBER_FORMS = [
    { type: DATA_TYPE.IMG, key: 'avator', label: '头像', needMessage: '请上传头像' },
    { type: DATA_TYPE.TEXT, key: 'name', label: '姓名', needMessage: '请输入姓名' },
    { type: DATA_TYPE.PHONE, key: 'mobile', label: '手机号', needMessage: '请输入手机号', maxMessage: '手机号不许超过11位' },
    { type: DATA_TYPE.TEXT, key: 'weixin', label: '微信号', needMessage: '请输入微信号' },
    { type: DATA_TYPE.TEXT, key: 'detail', label: '介绍', needMessage: '请输入介绍' },
    { type: DATA_TYPE.TEXT, key: 'memberNumber', label: '编号', needMessage: '请输入编号' },
    { type: DATA_TYPE.SELECT, key: 'type', label: '选手类型', needMessage: '请选择选手类型', selectOptions: MEMBER_TYPE },
];

export const OPTION_FORMS = [
    { type: DATA_TYPE.EDITOR, key: 'attention', label: '关注', needMessage: false }, // editor类型，needMessage必须为false
];
