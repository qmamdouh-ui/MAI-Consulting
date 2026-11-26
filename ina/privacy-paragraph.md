# Replacement text for privacy/index.html (publish with the go-live commit, not before)

Replaces the paragraph that begins "Site assistant (Ina)." and that currently says the assistant sends nothing to a language model.

```html
<p><strong>Site assistant (Ina).</strong> Ina is an automated assistant that runs on a language model. When you write to her, your messages, together with the earlier messages of the same conversation, are sent to our assistant service and from there to Anthropic, which provides the model, so that she can answer. We keep the full conversation, with its date and the page you were on, so that we can check that she answers correctly and improve her; we do not record your IP address. Please do not type personal data, confidential information or names of beneficiaries or colleagues into the chat. If you choose to leave your name and email address, the conversation and those details are sent to us by email through EmailJS, like the contact form. Conversations are kept for three years from the date they take place, like other contact correspondence, and you can ask us to delete yours.</p>
```

Check with the owner before publishing: the retention period (the page's retention list gives three years for assistant transcripts), the Anthropic data-processing terms for the API key used, and whether the privacy notice needs a named processor entry for the assistant service host.
