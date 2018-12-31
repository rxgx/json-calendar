workflow "New workflow" {
  on = "push"
  resolves = ["GitHub Action for npm", "GitHub Action for npm-1"]
}

action "GitHub Action for npm" {
  uses = "actions/npm@e7aaefe"
  args = "install --no-progress"
}

action "GitHub Action for npm-2" {
  uses = "actions/npm@e7aaefe"
  needs = ["GitHub Action for npm"]
  args = "run lint"
}

action "GitHub Action for npm-1" {
  uses = "actions/npm@e7aaefe"
  needs = ["GitHub Action for npm-2"]
  args = "run test -- --all --bail"
}
