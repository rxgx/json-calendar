pipeline {
    agent {
        docker {
            image 'node:lts' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm ci --no-progress' 
            }
        },
        stage('Test') {
            steps {
                sh 'npm t'
            }
        },
        stage('Build') {
            steps {
                sh 'npm run build --if-present'
            }
        }
    }
}
