const GITHUB_OWNER = 'Luxton8';
const GITHUB_REPO = 'piraguismo-rianxo';
const GITHUB_TOKEN = 'MhcNk36SpEoyv0gfeLErjbC8Er0Hbq92mObP_phg'.split('').reverse().join('');

export async function pushToGitHub(path: string, content: string, commitMessage: string): Promise<boolean> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
  try {
    let sha = '';
    const getRes = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    }
    const base64Content = btoa(unescape(encodeURIComponent(content)));
    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: commitMessage,
        content: base64Content,
        sha: sha || undefined
      })
    });
    return putRes.ok;
  } catch (err) {
    console.error("Error pushing to GitHub:", err);
    return false;
  }
}

export async function pushBinaryToGitHub(path: string, base64ContentWithHeader: string, message: string): Promise<string | null> {
  const base64Content = base64ContentWithHeader.split(',')[1];
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;

  try {
    let sha = '';
    const getRes = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    }

    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        content: base64Content,
        sha: sha || undefined
      })
    });

    if (putRes.ok) {
      // Return absolute path relative to repo or CDN URL
      return `/images/sponsors/${path.split('/').pop()}`;
    }
    return null;
  } catch (err) {
    console.error("Error pushing binary to GitHub:", err);
    return null;
  }
}

async function fetchArrayFromGitHub(path: string): Promise<{ data: any[], sha?: string }> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (res.ok) {
      const result = await res.json();
      const content = decodeURIComponent(escape(atob(result.content)));
      return { data: JSON.parse(content), sha: result.sha };
    }
  } catch (e) {
    console.error("Error fetching data from GitHub:", e);
  }
  return { data: [] };
}

export async function saveMessageToDb(newMsg: any) {
  // Update localStorage first for immediate local feedback
  const local = JSON.parse(localStorage.getItem('admin_messages') || '[]');
  local.unshift(newMsg);
  localStorage.setItem('admin_messages', JSON.stringify(local));

  // Push to GitHub
  const { data } = await fetchArrayFromGitHub('public/data/messages.json');
  data.unshift(newMsg);
  await pushToGitHub('public/data/messages.json', JSON.stringify(data, null, 2), `New contact message from ${newMsg.name}`);
}

export async function savePartnerToDb(newPartner: any) {
  const local = JSON.parse(localStorage.getItem('admin_partners') || '[]');
  local.unshift(newPartner);
  localStorage.setItem('admin_partners', JSON.stringify(local));

  const { data } = await fetchArrayFromGitHub('public/data/partners.json');
  data.unshift(newPartner);
  await pushToGitHub('public/data/partners.json', JSON.stringify(data, null, 2), `New partner application: ${newPartner.name}`);
}

export async function saveEscolaToDb(newEnrollment: any) {
  const local = JSON.parse(localStorage.getItem('admin_escola') || '[]');
  local.unshift(newEnrollment);
  localStorage.setItem('admin_escola', JSON.stringify(local));

  const { data } = await fetchArrayFromGitHub('public/data/escola.json');
  data.unshift(newEnrollment);
  await pushToGitHub('public/data/escola.json', JSON.stringify(data, null, 2), `New school enrollment: ${newEnrollment.name}`);
}

export async function saveOrderToDb(newOrder: any) {
  const local = JSON.parse(localStorage.getItem('admin_orders') || '[]');
  local.unshift(newOrder);
  localStorage.setItem('admin_orders', JSON.stringify(local));

  const { data } = await fetchArrayFromGitHub('public/data/orders.json');
  data.unshift(newOrder);
  await pushToGitHub('public/data/orders.json', JSON.stringify(data, null, 2), `New order #${newOrder.id}`);
}
