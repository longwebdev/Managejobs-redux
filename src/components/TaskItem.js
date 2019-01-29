import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
class TasKItem extends Component {
    onUpdateStatus = () =>{
      this.props.onUpdateStatus(this.props.task.id);
    }


   changeStatus () {
     if(this.props.task.status === true){
         return <span
                  onClick={this.onUpdateStatus}
                 className="label label-success"
                 >
                   Kích Hoạt
                </span>;
    }else {
      return <span 
              onClick={this.onUpdateStatus}
              className="label label-info">
                  Ẩn
               </span>;
    }
  }
  onDelete = ()=>{
    this.props.onDeleteTask(this.props.task.id);
    this.props.onCloseForm();
  }
  onEditTask = ()=>{
    
    this.props.onOpenForm();
    this.props.onEditTask(this.props.task);
  }
  render() {
    var { task, index } = this.props;
    return (
                        
                            <tr>
                              <td>{index + 1}</td>
                              <td>{task.name}</td>
                              <td className="text-center">
                                {this.changeStatus()}
                              </td>
                              <td className="text-center">
                                <button 
                                type="button" 
                                className="btn btn-warning"
                                onClick={this.onEditTask}
                                >
                                  <span className="fa fa-pencil mr-5" />Sửa
                                </button>
                                &nbsp;
                                <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick={ this.onDelete}
                                >
                                  <span className="fa fa-trash mr-5" />Xóa
                                </button>
                              </td>
                            </tr>
                              
    );
  }
}
const mapStateToProps = (state) =>{
    return {};
};
const mapDispatchToProps = (dispatch, props) =>{
    return {
      onUpdateStatus : (id) =>{
          dispatch(actions.updateStatus(id));
      },
      onDeleteTask : (id) =>{
        dispatch(actions.deleteTask(id));
      },
      onCloseForm : () =>{
          dispatch(actions.closeForm());
      },
      onOpenForm : () =>{
          dispatch(actions.openForm());
      },
      onEditTask : (task) => {
          dispatch(actions.editTask(task));
      }     
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasKItem);
