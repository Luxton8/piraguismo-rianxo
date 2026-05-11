import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderContact } from '../components/Contact'
import { renderFooter } from '../components/Footer'

const app = document.querySelector<HTMLDivElement>('#app')!

app.appendChild(renderNavigation())

const main = document.createElement('main')
main.className = 'pt-24'
main.appendChild(renderContact())
app.appendChild(main)

app.appendChild(renderFooter())
