pipeline {
    agent {
        docker {
            image: 'node:lts'
            label: 'nodejs'
            args: '-p 3000:3000'
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm ci' 
            }
        }
    }
}
