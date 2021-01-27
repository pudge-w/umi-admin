import { FC } from 'react';
import { useParams } from 'umi';

interface ParamsType {
  id: string;
}

const Login: FC = () => {
  const params: ParamsType  = useParams();
  return (
    <div>Login {params.id}</div>
  )
}

export default Login;