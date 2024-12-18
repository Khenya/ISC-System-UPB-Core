provider "aws" {
  region = "us-east-1"
}

# Grupo de seguridad para la instancia
resource "aws_security_group" "isc_system_core_sg" {
  name        = "isc-system-core-security-group"
  description = "Security group con puerto 8000 abierto"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTP on port 8000"
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Llave SSH para acceso a la instancia
resource "aws_key_pair" "backend-ssh" {
  key_name   = "isc-system-backend-ssh"
  public_key = file("isc-system-backend-ssh.key.pub")
}

# Instancia EC2 para el backend
resource "aws_instance" "isc_system_core_server" {
  ami           = "ami-0e2c8caa4b6378d8c" 
  instance_type = "t2.micro"
  key_name      = aws_key_pair.backend-ssh.key_name
  vpc_security_group_ids = [aws_security_group.isc_system_core_sg.id]

  tags = {
    Name = "Backend--ISC-UPB-System-App"
  }

  provisioner "remote-exec" {
    connection {
      type        = "ssh"
      host        = self.public_ip
      user        = "ec2-user"
      private_key = file("isc-system-core-backend-ssh.key")
    }

    inline = [
      "sudo apt update -y",
      "sudo apt upgrade -y",
      "sudo apt install -y nodejs npm git",  #
      "mkdir -p /home/ec2-user/backend",
      "cd /home/ec2-user",
      "git clone https://github.com/Khenya/ISC-System-UPB-Core.git backend", 
      "cd /home/ec2-user/backend",
      "npm install", 
      "echo '#!/bin/bash' > /home/ec2-user/backend/start.sh",
      "echo 'cd /home/ec2-user/backend' >> /home/ec2-user/backend/start.sh",
      "echo 'nohup node server.js > nohup.out 2>&1 &' >> /home/ec2-user/backend/start.sh", 
      "chmod +x /home/ec2-user/backend/start.sh",
      "bash /home/ec2-user/backend/start.sh"
    ]
  }
}

# Elastic IP para la instancia
resource "aws_eip" "backend_eip" {
  instance = aws_instance.isc_system_core_server.id
  tags = {
    Name = "Backend-ISC-UPB-System-App-EIP"
  }
}
