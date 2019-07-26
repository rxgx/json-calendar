workflow "Pull Request" {
  on = "push"
  resolves = [
    "dependencies",
    "test",
  ]
}

action "dependencies" {
  uses = "actions/npm@e7aaefe"
  args = "install --no-progress"
}

action "lint" {
  uses = "actions/npm@e7aaefe"
  args = "run lint"
  needs = ["dependencies"]
}

action "test" {
  uses = "actions/npm@e7aaefe"
  args = "run test -- --all --bail"
  needs = ["lint"]
}
