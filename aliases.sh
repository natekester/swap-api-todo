##the purpose of this is to provide a team aliases document - enabling everyone to have shared aliases across a team.
# in some ways this would be replacing a makefile

TODO_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)

export PATH="$PATH:$TODO_DIR/bin"

alias dc="docker-compose"
alias testingAliases="echo 'yay'"
alias st="status"