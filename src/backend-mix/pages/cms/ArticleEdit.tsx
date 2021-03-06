import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Editor from '../../components/Editor';
import { FormControlLabel, FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import moment from 'moment';
import { DatePicker } from 'material-ui-pickers';

const styles = {
    root: {
        'padding': '40px 30px',
        'margin-bottom': '60px',
    },
    container: {
        display: 'flex',
        'flex-wrap': 'wrap',
        'margin': '0',
    },
    formLabel: {
        'flex-direction': 'row-reverse',
        'margin': '0',
        'font-size': '16px !important',
        'color': '#333',
        'width': '100%',
    },
    formLabelFont: {
        'font-size': '16px',
    },
    formControlMargin: {
        'margin-bottom': '32px',
    },
    underline: {
        '&:before': {
            background: '#dfdfdf',
        }
    },
    switchHeight: {
        'height': '20px',
    },
    switchDefault: {
        'height': 'inherit',
    },
    editor: {},
};
type State = {
    webName: string,
    img: string,
    type: string,
    topType: string,
    types: Array<any>,
    topTypes: Array<any>,
    abstract: string,
    time: any,
    link: string,
    origin: string,
    kind: string,
    pageType: string,
    isHidden: boolean,
    path: any,
    editor: any,
};

class ArticleEdit extends React.Component<WithStyles<keyof typeof styles>, State> {
    constructor (props: any, state: any) {
        super(props, state);
        let type = '';
        if (props.location.pathname.indexOf('/add') > 0) {
            type = '1';
        }
        this.state = {
            webName: 'NotAdd',
            img: 'LOGO.png',
            type: '',
            topType: '',
            types: [
                {
                    id: '12',
                    type: '新闻1',
                },
                {
                    id: '13',
                    type: '新闻2',
                },
                {
                    id: '14',
                    type: '新闻3',
                },
            ],
            topTypes: [
                {
                    id: '00',
                    type: '全局',
                },
                {
                    id: '01',
                    type: '一级分类',
                },
                {
                    id: '02',
                    type: '二级分类',
                },
                {
                    id: '03',
                    type: '三级分类',
                },
                {
                    id: '04',
                    type: '当前分类',
                },
            ],
            abstract: '',
            time: moment(),
            link: 'http://',
            origin: 'www.ibenchu.com',
            kind: '新闻资讯',
            isHidden: false,
            pageType: type,
            path: 'neditor/',
            editor: {
                id: 0,
                content: '',
            },
        };
    }
    handleDateChange = (date: any) => {
        // let currentTime = new Date(date).toLocaleDateString();
        // window.console.log(currentTime);
        this.setState({ time: date });
    };
    handleChange = (name: any) => (event: any) => {
        let val = event.target.value;
        this.setState({
            [name]: val,
        });
    };
    handleEditorChange = (content: any, id: any) => {
        this.setState({
            editor: {
                content: content,
            }
        });
    };
    handleSubmit = (event: any) => {
        event.preventDefault();
    };
    getImgURL = (event: any) => {
        this.setState({
            img: event.target.value.substr(12),
        });
    };
    render() {
        return (
            <div className="top-action-module cms">
                <p className="crumbs">
                    CMS / 文章管理 / 全部文章
                </p>
                <h4 className="title">
                    {this.state.pageType === '1' ? '新增' : '编辑'}
                </h4>
                <Paper className={this.props.classes.root}>
                    <form className={this.props.classes.container} noValidate autoComplete="off">
                        <Grid container spacing={24}>
                            <Grid
                                item
                                xs={12}
                                sm={8}
                                style={{paddingRight: '40px'}}
                                className="grid-editor-module"
                            >
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        className={this.props.classes.formLabelFont}
                                    >
                                        文章标题
                                    </InputLabel>
                                    <Input
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        onChange={this.handleChange('webName')}
                                        value={this.state.webName}
                                    />
                                </FormControl>
                                <div className="editor">
                                    <Editor
                                        path={this.state.path}
                                        editor={this.state.editor}
                                        handleEditorChange={this.handleEditorChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                    style={{ position: 'relative'}}
                                >
                                    <InputLabel
                                        className={this.props.classes.formLabelFont}
                                    >
                                        缩略图
                                    </InputLabel>
                                    <Input
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        value={this.state.img}
                                    />
                                    <Input
                                        type="file"
                                        className="upload-image"
                                        onChange={this.getImgURL}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                    />
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        className={this.props.classes.formLabelFont}
                                    >
                                        分类
                                    </InputLabel>
                                    <Select
                                        className="form-select-underline"
                                        value={this.state.type}
                                        onChange={this.handleChange('type')}
                                        input={<Input name="type"/>}
                                    >
                                        {
                                            this.state.types.map((item: any, index: number) => {
                                                return (
                                                    <MenuItem
                                                        className="input-drop-paper"
                                                        value={index}
                                                        key={index}
                                                    >
                                                        {item.type}
                                                    </MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        className={this.props.classes.formLabelFont}
                                    >
                                        摘要
                                    </InputLabel>
                                    <Input
                                        multiline={true}
                                        rowsMax="3"
                                        rows="3"
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        className={this.props.classes.formLabelFont}
                                        onChange={this.handleChange('abstract')}
                                        value={this.state.abstract}
                                    />
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        className={this.props.classes.formLabelFont}
                                    >
                                        置顶
                                    </InputLabel>
                                    <Select
                                        className="form-select-underline"
                                        value={this.state.topType}
                                        onChange={this.handleChange('topType')}
                                        input={<Input name="type" id="type-simple" />}
                                    >
                                        {
                                            this.state.topTypes.map((item: any, index: number) => {
                                                return (
                                                    <MenuItem
                                                        className="input-drop-paper"
                                                        value={index}
                                                        key={index}
                                                    >
                                                        {item.type}
                                                    </MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControlLabel
                                    label="隐藏"
                                    classes={{
                                        root: this.props.classes.formLabel,
                                        label: this.props.classes.formLabel
                                    }}
                                    className={this.props.classes.formControlMargin}
                                    control={
                                        <Switch
                                            classes={{
                                                root: this.props.classes.switchHeight,
                                                default: this.props.classes.switchDefault,
                                            }}
                                            onChange={
                                                (event: any, checked: boolean) => {
                                                    this.setState({ isHidden: checked});
                                                }}
                                            checked={this.state.isHidden}
                                        />
                                    }
                                />
                                <DatePicker
                                    className="data-picker"
                                    style={{marginBottom: '32px'}}
                                    keyboard
                                    clearable
                                    returnMoment
                                    format="MMMM Do, YYYY"
                                    label="发布时间"
                                    value={this.state.time}
                                    onChange={this.handleDateChange}
                                    animateYearScrolling={false}
                                />
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        className={this.props.classes.formLabelFont}
                                    >
                                        来源
                                    </InputLabel>
                                    <Input
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        onChange={this.handleChange('origin')}
                                        value={this.state.origin}
                                    />
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        className={this.props.classes.formLabelFont}
                                    >
                                        来源链接
                                    </InputLabel>
                                    <Input
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        onChange={this.handleChange('link')}
                                        value={this.state.link}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            raised
                            color="primary"
                            style={{marginTop: 34, fontSize: 12, borderRadius: 4}}
                            onClick={this.handleSubmit}
                        >
                            确认提交
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
}
export default withStyles(styles)(ArticleEdit);