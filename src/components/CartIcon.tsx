import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store/store'
import { Badge } from '@mui/material'

type CartIconProps = {
  onClick?: React.MouseEventHandler
}

function CartIcon({ onClick }: CartIconProps) {
  const count = useSelector((state: RootState) => state.counter.value)
  return (
    <IconButton
      size='large'
      aria-label='shopping cart'
      color='inherit'
      onClick={onClick}
    >
      <Badge badgeContent={count} color='error'>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  )
}

export default CartIcon
