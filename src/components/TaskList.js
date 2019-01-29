import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskItem from './TaskItem';
import * as actions from './../actions/index';
class TasKList extends Component {

      constructor(props){
          super(props);
          this.state = {
              filterName: '',
              filterStatus: -1 // tất cả là -1, active là 1, còn lại là 0
          };
        }    
   onChange = (event) =>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    
    var filter = {
      name : name === 'filterName' ? value : this.state.filterName,
      status : name === 'filterStatus' ? value : this.state.filterStatus
    };
    this.props.onFilterTable(filter);
    this.setState({
        [name] : value
    });
   } 

  render() {
    var { tasks, filterTable, keyword } = this.props;

    if (filterTable) {
      if(filterTable.name){
        //lọc từng phần tử trong bảng task
        tasks = tasks.filter((task)=>{
            // duyệt trong bảng task và biến phần tử thành chữ thường rồi kiểm tra phần từ bằng hàm indexOf()
            return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
        });
      }
      tasks = tasks.filter((task)=>{
        if(filterTable.status === -1){
          return task;
        }else{
          return task.status === (filterTable.status === 1 ? true : false);
        }
      }); 
    }
    //keyword
    if(keyword){
      //lọc từng phần tử trong bảng task
        tasks = tasks.filter((task)=>{
            // duyệt trong bảng task và biến phần tử thành chữ thường rồi kiểm tra phần từ bằng hàm indexOf()
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
    }
    //sort
    var { sort } = this.props;
    if(sort.by === 'name'){
      tasks.sort((a, b)=>{
        if(a.name > b.name) return sort.value;
        else if(a.name > b.name) return -sort.value;
        else return 0;
      });
    }else{
      tasks.sort((a, b)=>{
        if(a.status > b.status) return -sort.value;
        else if(a.status > b.status) return sort.value;
        else return 0;
      });
    }
    var { filterName, filterStatus } = this.state;
     var elementsTasks = tasks.map((task, index) =>{
       return <TaskItem
                key={task.id}
                index={index}
               task={task}
       />;
    });
    return (
      <div className="row mt-15">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <table className="table table-bordered table-hover">
                          <thead>
                            <tr>
                              <th className="text-center">STT</th>
                              <th className="text-center">Tên</th>
                              <th className="text-center">Trạng Thái</th>
                              <th className="text-center">Hành Động</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td />
                              <td>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="filterName"
                                value={filterName}
                                onChange={this.onChange}
                                />
                              </td>
                              <td>
                                <select 
                                className="form-control"
                                name="filterStatus"
                                value={filterStatus}
                                onChange={this.onChange}
                                >
                                  <option value={-1}>Tất Cả</option>
                                  <option value={0}>Ẩn</option>
                                  <option value={1}>Kích Hoạt</option>
                                </select>
                              </td>
                              <td />
                            </tr>
                              { elementsTasks }
                          </tbody>
                        </table>
                  </div>
              </div>     
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    tasks : state.tasks,
    filterTable : state.filterTable,
    keyword : state.search,
    sort : state.sort
  }
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable : (filter) =>{
      dispatch(actions.filterTask(filter));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasKList);
