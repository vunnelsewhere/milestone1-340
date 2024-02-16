// Import List

interface Props {
  setAlias: (alias: string) => void;
  setPassword: (password: string) => void;
}

const AuthenticationFields = ({ setAlias, setPassword }: Props) => {
  // Cannot find name 'setAlias'.
  // Cannot find name 'setPassword'.
  /* Pass the setAlias and setPassword functions to it as props*/
  // Need to define the function type in the props interface

  return (
    // JSX expressions must have one parent element.
    <>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          placeholder="name@example.com"
          onChange={(event) => setAlias(event.target.value)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control bottom"
          id="passwordInput"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
};

export default AuthenticationFields;
