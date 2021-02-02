import { Redirect } from 'umi'

import { menuList } from '@/pages/admin/components/Menu';

import { useLocation, useHistory } from 'umi';

export default (props:any) => {
  const location = useLocation()
  const history = useHistory()

  const auth = JSON.parse(localStorage.getItem('auth') || '')

  let list = menuList.filter(item => {
    return auth.includes(item.auth)
  })

  let list2 = list.map(item => {
    return item.key;
  })

  if (localStorage.getItem('token') ) {
    if (list2.includes(location.pathname)) {
      return <div>{ props.children }</div>;
    } else {
      history.go(-1)
    }
    
  } else {
    return <Redirect to="/login" />;
  }
}