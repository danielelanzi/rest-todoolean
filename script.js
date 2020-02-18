$(document).ready(function functionName() {
  printAllTodos();

  $('#button-add').click(function(){
    var todoValue = $('#input-add').val();
    createTodo(todoValue);
  });

  $(document).on('click','.delete-todo', function () {
    var buttonDelete =$(this);
    var idTodo = buttonDelete.parent().attr('data-id');
    deleteTodo(idTodo);
  });

  $('#input-add').keypress(function() {
    if (event.which == 13) {
      var todoValue = $('#input-add').val();
      createTodo(todoValue);
    }
  });
});

function printAllTodos() {
  $.ajax({
    url:'http://157.230.17.132:3018/todos',
    method:'GET',
    success:function(data){
      var todos = data
      var source = $('#entry-template').html();
      var template = Handlebars.compile(source);
      for (var i = 0; i < todos.length; i++) {
      var todo =  todos[i];
      var context = {
        text: todo.text,
        id: todo.id
      }
      var html = template(context);
      $('ul.todos').append(html);
    }
    },
    error:function () {
      alert('errore');
    }
  });
}

function createTodo(todoValue) {
  $.ajax({
    url:'http://157.230.17.132:3018/todos',
    method:'POST',
    data: {
      text: todoValue
    },
    success:function(data){
      $('ul.todos').html('');
      printAllTodos();
    },
    error:function () {
      alert('errore');
    }
  });
}

function deleteTodo(id) {
  $.ajax({
    url:'http://157.230.17.132:3018/todos/'+ id,
    method:'DELETE',
    success:function(data){
      $('ul.todos').html('');
      printAllTodos();
    },
    error:function () {
      alert('errore');
    }
  });
}
