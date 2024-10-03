import styleTemplate from "./RegistrationTemplate.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserListContext } from "../../context/UserListContext";
const RegistrationTemplate = () => {
  const navigate = useNavigate();
  const { userTemplate, handleInputChange, handleCreateUser } =
    useContext(UserListContext);

  return (
    <section>
      <form className={styleTemplate.login} onSubmit={handleCreateUser}>
        <h2 className={styleTemplate.title}>New user registration</h2>
        <div>
          <label className={styleTemplate.label}>First Name: </label>
          <input
            className={styleTemplate.field}
            name="firstName"
            type="text"
            value={userTemplate.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className={styleTemplate.label}>Last Name: </label>
          <input
            className={styleTemplate.field}
            name="lastName"
            type="text"
            value={userTemplate.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className={styleTemplate.label}>User Status: </label>
          <select
            className={styleTemplate.field}
            name="userstatus"
            value={userTemplate.userstatus}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select User Status
            </option>
            <option value="Employee">Employee</option>
            <option value="Former Employee">Former Employee</option>
            <option value="Candidate">Candidate</option>
          </select>
        </div>
        <div>
          <label className={styleTemplate.label}>Password: </label>
          <input
            className={styleTemplate.field}
            name="password"
            type="text"
            value={userTemplate.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className={styleTemplate.label}>Type: </label>

          <select
            className={styleTemplate.field}
            name="type"
            value={userTemplate.type}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="SuperAdmin">SuperAdmin</option>
          </select>
        </div>
        <div>
          <label className={styleTemplate.label}>Email: </label>
          <input
            className={styleTemplate.field}
            name="email"
            type="email"
            value={userTemplate.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className={styleTemplate.button} type="submit">
          Register
        </button>
      </form>
    </section>
  );
};

export default RegistrationTemplate;
