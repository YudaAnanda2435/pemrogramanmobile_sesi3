import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';

const TodoList = () => {
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState([
    {id: 1, title: 'Learn React Native', completed: false},
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (!title) {
      return Alert.alert('Error', 'Please enter your todo');
    }
    if (isEditing && editId !== null) {
      const updatedTodos = todo.map(item =>
        item.id === editId ? {...item, title} : item,
      );
      setTodo(updatedTodos);
      setIsEditing(false);
      setEditId(null);
    } else {
      const newTodo = {
        id: todo.length + 1,
        title: title,
        completed: false,
      };
      setTodo([...todo, newTodo]);
    }
    setTitle('');
  };

  const handleDelete = (id: number) => {
    setTodo(todo.filter(item => item.id !== id));
  };

  const handleEdit = (id: number) => {
    const todoToEdit = todo.find(item => item.id === id);
    if (todoToEdit) {
      setTitle(todoToEdit.title);
      setIsEditing(true);
      setEditId(id);
    } else {
      Alert.alert('Error', 'Todo not found');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your todo"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <Pressable style={styles.button} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>
            {isEditing ? 'Edit Todo' : 'Add Todo'}
          </Text>
        </Pressable>
      </View>
      <View style={styles.todoContainer}>
        {todo.map(item => (
          <View key={item.id} style={styles.todoItem}>
            <Text style={styles.todoText}>{item.title}</Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.editButton}
                onPress={() => handleEdit(item.id)}>
                <Text style={styles.editButtonText}>Edit</Text>
              </Pressable>
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  todoContainer: {
    marginTop: 20,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  todoText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
    marginRight: 5, // Jarak antar tombol
    width: 70, // Lebar tetap untuk tombol edit
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center', // Rata tengah teks
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    width: 70, // Lebar tetap untuk tombol delete
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center', // Rata tengah teks
  },
});

export default TodoList;
