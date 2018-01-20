import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ClearIcon from 'material-ui-icons/Clear';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Search from 'material-ui-icons/Search';
import Add from 'material-ui-icons/Add';
import Cached from 'material-ui-icons/Cached';
import Typography from 'material-ui/Typography';
import Popover from 'material-ui/Popover';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from 'material-ui/Table';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

const styles = {
    evenRow: {
        'background': '#f7f7f7',
    },
    menuBtn: {
        'width': '32px',
        'height': '32px',
        'border-radius': '50%',
        'background-color': '#3f51b5',
        'color': '#fff',
        'margin-left': '10px',
    },
    btnEdit: {
        'width': '32px',
        'height': '32px',
        'border-radius': '50%',
        'background-color': '#3f51b5',
        'color': '#fff',
        'margin-left': '10px',
        'box-shadow': '0px 2px 4px 0 rgba(0, 0, 0, 0.3)',
    },
    btnDelete: {
        'width': '32px',
        'height': '32px',
        'border-radius': '50%',
        'background-color': '#fff',
        'color': '#808080',
        'margin-left': '10px',
        'box-shadow': '0px 2px 4px 0 rgba(0, 0, 0, 0.3)',
    },
    root: {
        'padding': '40px 30px',
    },
    table: {
        'border-top': '1px solid rgba(235, 235, 235, 1)',
        'border-collapse': 'inherit',
    },
    tableCell: {
        'text-align': 'left',
        'padding': '0',
    },
};
type State = {
    checkedAll: boolean,
    rowsPerPage: number,
    currentPage: number,
    open: boolean,
    openMessageTip: boolean,
    modalId: string,
    modalName: string,
    modalType: number,
    modalNum: number,
    message: string,
    list: Array<any>,
    listPage: Array<any>,
};

class Article extends React.Component<WithStyles<keyof typeof styles>, State> {
    state = {
        checkedAll: false,
        rowsPerPage: 3,
        currentPage: 1,
        open: false,
        modalId: '',
        modalName: '',
        modalType: 0,
        modalNum: 0,
        openMessageTip: false,
        list: [
            {
                id: 1,
                check: false,
                name: '标题名称测试标题名称测试标题名称测试标题名称测试',
                type: '新闻资讯1',
                time: '2017-12-01 13:20:59',
            },
            {
                id: 2,
                check: false,
                name: '标题名称测试标题名称测试标题名称测试标题名称测试',
                type: '新闻资讯2',
                time: '2017-12-01 13:20:59',
            },
            {
                id: 3,
                check: false,
                name: '标题名称测试标题名称测试标题名称测试标题名称测试',
                type: '新闻资讯3',
                time: '2017-12-01 13:20:59',
            },
            {
                id: 4,
                check: false,
                name: '标题名称测试标题名称测试标题名称测试标题名称测试',
                type: '新闻资讯4',
                time: '2017-12-01 13:20:59',
            },
            {
                id: 5,
                check: false,
                name: '标题名称测试标题名称测试标题名称测试标题名称测试',
                type: '新闻资讯5',
                time: '2017-12-01 13:20:59',
            },
            {
                id: 6,
                check: false,
                name: '标题名称测试标题名称测试标题名称测试标题名称测试',
                type: '新闻资讯4',
                time: '2017-12-01 13:20:59',
            },
            {
                id: 7,
                check: false,
                name: '标题名称测试标题名称测试标题名称测试标题名称测试',
                type: '新闻资讯5',
                time: '2017-12-01 13:20:59',
            },
        ],
        listPage: [],
        message: '',
    };
    handleChangeAll = (name: any) => (event: any) => {
        const rowPage = this.state.rowsPerPage;
        const currentPage = this.state.currentPage;
        const lists = this.state.list.slice(((currentPage - 1) * rowPage), currentPage * rowPage);
        if (event.target.checked) {
            lists.map(item => {
                item.check = true;
            });
        } else {
            lists.map(item => {
                item.check = false;
            });
        }
        this.setState({
            [name]: event.target.checked,
            listPage: lists,
        });
        window.console.log(this.state.listPage);
    };
    handleChange = (pro: any) => (event: any) => {
        this.state.checkedAll = true;
        pro.check = true;
        if (!event.target.checked) {
            pro.check = false;
        }
        this.state.list.map(item => {
            if (item.check === false) {
                this.state.checkedAll = false;
            }
        });
        this.setState({
            [pro]: event.target.checked,
        });
    };
    handleClickRemove = (pro: any) => {
        this.state.modalName = pro.name;
        this.state.modalId = pro.id;
        this.setState({
            open: true,
            modalType: 0,
        });
    };
    handleBatchRemove = () => {
        const arr = new Array();
        Object.keys(this.state.list).forEach(item => {
            if (this.state.list[item].check) {
                arr.push(this.state.list[item].check);
                this.setState({
                    open: true,
                    modalType: 1,
                    modalNum: arr.length,
                });
            } else {
                this.setState({
                    openMessageTip: true,
                    message: '请选择要删除的文章',
                });
                setInterval(() => {
                    this.setState({
                        openMessageTip: false,
                    });
                }, 1500);
            }
        });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    handleSubmit = () => {
        this.setState({ open: false });
    };
    handlePageClick = (data: any) => {
        this.setState({
            currentPage: data.selected,
            checkedAll: false,
        });
    };
    render() {
        const { currentPage, rowsPerPage, list, modalType, openMessageTip, message } = this.state;
        return (
            <div className="top-action-module cms">
                <p className="crumbs">
                    CMS / 文章管理
                </p>
                <h4 className="title">全部文章</h4>
                <div className="btn-group">
                    <IconButton
                        className={this.props.classes.menuBtn}
                    >
                        <Search />
                    </IconButton>
                    <IconButton
                        className={this.props.classes.menuBtn}
                        onClick={this.handleBatchRemove}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <Link to={'/cms/article/edit/' + 'add'}>
                        <IconButton
                            className={this.props.classes.menuBtn}
                        >
                            <Add />
                        </IconButton>
                    </Link>
                    <IconButton
                        className={this.props.classes.menuBtn}
                    >
                        <Cached />
                    </IconButton>
                </div>
                <Paper className="root-paper">
                    <div className="table-hidden">
                        <Table className={this.props.classes.table}>
                            <TableHead className="table-head">
                                <TableRow>
                                    <TableCell className="table-cell-status">
                                        <Checkbox
                                            checked={this.state.checkedAll}
                                            onChange={this.handleChangeAll('checkedAll')}
                                            value="checkedAll"
                                        />
                                    </TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>文章名称</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>分类</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>发布时间</TableCell>
                                    <TableCell numeric/>
                                </TableRow>
                            </TableHead>
                            <TableBody className="table-body">
                                {list.slice(currentPage * rowsPerPage, rowsPerPage * currentPage + rowsPerPage)
                                    .map((n, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                className={index % 2 === 0 ? this.props.classes.evenRow : ''}
                                                key={n.id}
                                            >
                                                <TableCell
                                                    padding="checkbox"
                                                    className="table-cell-status"
                                                >
                                                    <Checkbox
                                                        checked={n.check}
                                                        onChange={this.handleChange(n)}
                                                        value="n.check"
                                                    />
                                                </TableCell>
                                                <TableCell className={this.props.classes.tableCell} numeric>
                                                    {n.name}
                                                </TableCell>
                                                <TableCell className={this.props.classes.tableCell} numeric>
                                                    {n.type}
                                                </TableCell>
                                                <TableCell className={this.props.classes.tableCell} numeric>
                                                    {n.time}
                                                </TableCell>
                                                <TableCell className="table-action-btn" numeric>
                                                    <Link to={'/cms/article/edit/' + n.id}>
                                                        <IconButton
                                                            className={this.props.classes.btnEdit}
                                                        >
                                                            <ModeEdit />
                                                        </IconButton>
                                                    </Link>
                                                    <IconButton
                                                        className={this.props.classes.btnDelete}
                                                        onClick={() => this.handleClickRemove(n)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </div>
                    <Popover
                        open={openMessageTip}
                        anchorPosition={{ top: 0, left: 400 }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        className="message-pop-over"
                    >
                        <Typography className="message-content">{message}</Typography>
                    </Popover>
                    <div className="table-pagination">
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={<a href="javascript:;">...</a>}
                            breakClassName={'break-me'}
                            pageCount={list.length / rowsPerPage}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={2}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </div>
                </Paper>
                <Dialog
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="dialog-content-action"
                >
                    <DialogTitle
                        id="alert-dialog-title"
                        className="dialog-title"
                    >
                        <IconButton
                            onClick={this.handleClose}
                        >
                            <ClearIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className="dialog-content">
                        {
                            modalType === 0 ? <h4>确定要删除文章名称"{this.state.modalName}"吗?</h4> :
                                <h4>确定要删除这"{this.state.modalNum}"个文章吗?</h4>}

                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button onClick={this.handleClose}>
                            取消
                        </Button>
                        <Button onClick={this.handleSubmit} autoFocus>
                            确认提交
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default withStyles(styles)(Article);