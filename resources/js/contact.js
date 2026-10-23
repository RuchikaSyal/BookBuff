
import { createClient } from
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://supabase.com/dashboard/project/ivwkrsuhjrdfzzfwmcst';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_HEjzV96NgTQu888KOPNZTw_wRlnyeUI';

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const button = form.querySelector('[type="submit"]');
  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = 'Sending...';
  status.textContent = '';

  const formData = new FormData(form);

  const contact = {
    first_name: String(formData.get('first_name') || '').trim(),
    last_name: String(formData.get('last_name') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    message: String(formData.get('message') || '').trim()
  };

  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert(contact);

    if (error) throw error;

    status.textContent = 'Thank you! Your message was sent.';
    form.reset();
  } catch (error) {
    console.error('Contact form submission failed:', error);
    status.textContent =
      'Sorry, your message could not be sent. Please try again.';
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
});
