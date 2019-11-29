pipeline {
    agent {
        docker {
            image 'node:lts'
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Prepare') {
            steps {
                echo 'Install Dependencies'
                sh 'npm ci --no-progress' 
            }
        }
        stage('Test') {
            steps {
                echo 'Jest Tests'
                sh 'npm t'
            }
        }
        stage('Build') {
            steps {
                echo 'Build TypeScript'
                sh 'npm run build --if-present'
            }
        }
    }
}
