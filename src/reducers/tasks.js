import * as types from './../constants/ActionTypes';


var s4 = () =>{
      //hàm tạo ra những con số ngẫu nhiên
      return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }
var GenerateID = () =>{
      //bingding ID
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() +
          '-' + s4() + s4() + s4();
} 

//lấy vị trí của từng phần tử dựa vào id
var findIndex = (tasks, id)=>{
     
      var result = -1;
      tasks.forEach((task, index)=>{
        if(task.id === id){
          result = index;
        }
      });
      return result;
    }

var data = JSON.parse(localStorage.getItem('tasks'));
//nếu có dữ liệu thì t thêm vào state ko có t trả về 1 chuỗi rỗng
var initialState = data ? data : [];

var myReducer = (state = initialState, action) =>{
	var id = '';
	var index = -1;
	switch (action.type) {
		case types.LIST_ALL:
			return state;
		case types.SAVE_TASK:
			var task = {
					id : action.task.id,
					name : action.task.name,
					status : action.task.status === 'true' ? true : false
				};
			if(!task.id){
				task.id = GenerateID();
				state.push(task);
			}else {
				index = findIndex(state, task.id);
				state[index] = task;
			}
			
			localStorage.setItem('tasks', JSON.stringify(state));
			//trả về 1 cái array mới

			return [...state];
		case types.UPDATE_STATUS_TASK:
			
		 id = action.id;	
   
      // var index = this.findIndex(id);
       index = findIndex(state, id);
      //sau khi lấy được vị trí
      state[index] = {
      		//copy lại cái danh mới cữ
      		...state[index],
      		// và thay đổi cái status của nó
      		status : !state[index].status
      };
        localStorage.setItem('tasks', JSON.stringify(state));
      
    
			return [...state];
		case types.DELETE_TASK:
			 id = action.id;
			 index = findIndex(state, id);
			state.splice(index, 1);
			localStorage.setItem('tasks', JSON.stringify(state));	
			return [...state];	
		default:
			return state;
			
	}
	
}

export default myReducer;