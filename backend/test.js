const jwt = require('jsonwebtoken');
async function test() {
  const token = jwt.sign({ id: 'dummy_id' }, 'fallback_secret_key_if_env_is_missing');

  console.log('\n--- Test A: Missing listing, Question: "hi" ---');
  const resA = await fetch('http://localhost:5000/api/gemma/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ question: 'hi' })
  });
  console.log(await resA.json());

  console.log('\n--- Test B: Missing listing, Question: "Why is this a good match?" ---');
  const resB = await fetch('http://localhost:5000/api/gemma/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ question: 'Why is this a good match?' })
  });
  console.log(await resB.json());
}
test();
