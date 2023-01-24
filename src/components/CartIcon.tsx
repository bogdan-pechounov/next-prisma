import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Badge } from '@mui/material'
import { useCart } from '@/lib/store/hooks'

type CartIconProps = {
  onClick?: React.MouseEventHandler
}

function CartIcon({ onClick }: CartIconProps) {
  const { productArray } = useCart()
  return (
    <IconButton
      size='large'
      aria-label='shopping cart'
      color='inherit'
      onClick={onClick}
    >
      <Badge badgeContent={productArray.length} color='error'>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  )
}

export default CartIcon
