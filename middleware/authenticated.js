export default function ({ store, redirect }) {
  let check = window.localStorage.getItem('user')
  // If the user is not authenticated
  if (!check) {
    return redirect('/login')
  }
}