import { Form, redirect, useNavigation } from "react-router-dom";

// ACTION: runs when the <Form method="post"> is submitted.
// No onSubmit, no preventDefault, no useState for the fields.
// eslint-disable-next-line react-refresh/only-export-components
export const contactAction = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());
  if (!data.message?.trim()) return { error: "Message is required" }; // shown via useActionData
  console.log("Contact form:", data); // a real app would POST to an API here
  return redirect("/?sent=1"); // after success, navigate away
};

const Contact = () => {
  const navigation = useNavigation();
  const sending = navigation.state === "submitting";

  return (
    <Form method="post">
      <h1>Contact</h1>
      <input name="email" placeholder="email" />
      <textarea name="message" placeholder="message" />
      <button disabled={sending}>{sending ? "Sending..." : "Send"}</button>
    </Form>
  );
};

export default Contact;
