var fs = require("fs");
var path = require("path");

function renderemployees(team) {
  const teamarray = [];
  teamarray.push(
    team
      .filter(employee => {
        return employee.getRole() === "Engineer";
      })
      .map(engineer => {
        return renderengineer(engineer);
      })
  );
  teamarray.push(
    team
      .filter(employee => {
        return employee.getRole() === "Intern";
      })
      .map(intern => {
        return renderintern(intern);
      })
  );
  teamarray.push(
    team
      .filter(employee => {
        return employee.getRole() === "Manager";
      })
      .map(manager => {
        return rendermanager(manager);
      })
  );
  console.log(teamarray);
  return rendermain(teamarray.join(""));
}
function renderengineer(engineer) {
  let file = fs.readFileSync(
    path.resolve(__dirname, "../templates", "engineer.html"),
    "UTF-8"
  );
  console.log(file);
  file = replaceplaceholders(file, "name", engineer.getName());
  file = replaceplaceholders(file, "role", engineer.getRole());
  file = replaceplaceholders(file, "id", engineer.getId());
  file = replaceplaceholders(file, "email", engineer.getEmail());
  file = replaceplaceholders(file, "github", engineer.getGitHub());
  console.log(file);
  return file;
}
function rendermanager(manager) {
  let file = fs.readFileSync(
    path.resolve(__dirname, "../templates", "manager.html"),
    "UTF-8"
  );
  file = replaceplaceholders(file, "name", manager.getName());
  file = replaceplaceholders(file, "role", manager.getRole());
  file = replaceplaceholders(file, "id", manager.getId());
  file = replaceplaceholders(file, "email", manager.getEmail());
  file = replaceplaceholders(file, "officenumber", manager.getOfficeNumber());
  return file;
}
function renderintern(intern) {
  let file = fs.readFileSync(
    path.resolve(__dirname, "../templates", "intern.html"),
    "UTF-8"
  );
  file = replaceplaceholders(file, "name", intern.getName());
  file = replaceplaceholders(file, "role", intern.getRole());
  file = replaceplaceholders(file, "id", intern.getId());
  file = replaceplaceholders(file, "email", intern.getEmail());
  file = replaceplaceholders(file, "school", intern.getSchool());
  return file;
}
function rendermain(html) {
  let file = fs.readFileSync(
    path.resolve(__dirname, "../templates", "main.html"),
    "UTF-8"
  );
  file = replaceplaceholders(file, "team", html);
  return file;
}
function replaceplaceholders(file, placeholder, value) {
  const pattern = new RegExp("{{" + placeholder + "}}", "g");
  const replace = file.replace(pattern, value);
  return replace;
}
module.exports = renderemployees;
