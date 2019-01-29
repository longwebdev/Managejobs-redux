import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';


class Sort extends Component {

   

  onClick = (sortBy, sortValue) =>{
    
    this.props.onSort({
      by : sortBy,
      value : sortValue
    });
  }


  render() {
    var { sort } = this.props;
    console.log(sort);
    return (
            
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="dropdown">
                    <button 
                    className="btn btn-primary dropdown-toggle" 
                    type="button" 
                     id="dropdownMenu1" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="true">
                      Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                      <li onClick={ () => this.onClick('name', 1) }>
                        <p role="button" 
                        className={ sort.by === 'name' && sort.value === 1 ? 'sort_selected' : ''}
                        >
                          <span className="fa fa-sort-alpha-asc pr-5">
                            Tên A-Z
                          </span>
                        </p>
                      </li>
                      <li onClick={ () => this.onClick('name', -1) }>
                        <p role="button" 
                        className={ sort.by === 'name' && sort.value === -1 ? 'sort_selected' : ''}
                        >
                          <span className="fa fa-sort-alpha-desc pr-5">
                            Tên Z-A
                          </span>
                        </p>
                      </li>
                      <li role="separator" className="divider" />
                      <li onClick={ () => this.onClick('status', 1) }>

                      <p role="button" 
                       className={ sort.by === 'status' && sort.value === 1 ? 'sort_selected' : ''}
                        >

                      Trạng Thái Kích Hoạt

                      </p>

                      </li>
                      <li onClick={ () => this.onClick('status', -1) }>

                      <p role="button" 
                        className={ sort.by === 'status' && sort.value === -1 ? 'sort_selected' : ''}
                        >

                      Trạng Thái Ẩn

                      </p>

                      </li>
                    </ul>
                  </div>
                </div>
             
    );
  }
}
const mapStateToProps = (state) =>{
    return {
      sort : state.sort
    };
};
const mapDispatchToProps = (dispatch, props) =>{
    return {
      onSort : (sort) =>{
          dispatch(actions.sortTask(sort));
      },     
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
