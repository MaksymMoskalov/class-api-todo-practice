import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ text, id, index, deleteTodo }) => {
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO {index}
      </Text>
      <Text>{text}</Text>
      <DeleteButton type="button" onClick={() => deleteTodo(id)}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>
    </TodoWrapper>
  );
};
