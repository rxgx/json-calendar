// Reference: https://jenkins.io/doc/tutorials/build-a-node-js-and-react-app-with-npm/
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
                sh 'npm i --no-progress' 
            }
        }
        stage('Quality') {
            steps {
                sh 'npm run lint'
                sh 'npm t'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build --if-present'
            }
        }
    }
}
