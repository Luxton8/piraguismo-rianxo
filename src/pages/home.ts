import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderHero } from '../components/Hero'
import { renderSponsors } from '../components/Sponsors'
import { renderFooter } from '../components/Footer'

const app = document.querySelector<HTMLDivElement>('#app')!

app.appendChild(renderNavigation())

const main = document.createElement('main')
main.appendChild(renderHero())
main.appendChild(renderSponsors())
app.appendChild(main)

app.appendChild(renderFooter())
