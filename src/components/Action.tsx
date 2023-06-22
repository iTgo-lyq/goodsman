import { DetailedHTMLProps, FormHTMLAttributes } from "react";

export default function Action(
  props: DetailedHTMLProps<
    FormHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & {
    server: FormHTMLAttributes<HTMLDivElement>["action"];
  }
) {
  return (
    <form action={props.server}>
      <button type="submit">{props.children}</button>
    </form>
  );
}
