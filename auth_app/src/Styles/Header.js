import styles from 'styled-components';

const Header = styles.div`
    display:flex;
    justify-content: space-right;
    align-items: center;
    height: 100px;
    width:100%;
    background:coral;
    padding: 0px 100px;

    nav {
      display:flex;
      width: 40%;
      justify-content: space-between;

      a {
         text-decoration:none;
         color: yellow;
         font-size:18px;
      }
   }

`

export default Header;
