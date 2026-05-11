import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderHero } from '../components/Hero'
import { renderFooter } from '../components/Footer'

const app = document.querySelector<HTMLDivElement>('#app')!

app.appendChild(renderNavigation())

const main = document.createElement('main')
main.appendChild(renderHero())
app.appendChild(main)

app.appendChild(renderFooter())
