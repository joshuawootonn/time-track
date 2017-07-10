#include "connectionform.h"
#include "ui_connectionform.h"
#include "mainform.h"
#include <QFile>
#include <QStandardPaths>


ConnectionForm::ConnectionForm(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ConnectionForm)
{

    ui->setupUi(this);
    ui->databaseEdit->setText("aacidatabase");
    ui->usernameEdit->setText("user");
    ui->portEdit->setText("3306");
    ui->ipEdit->setText("192.168.41.187");
    ui->error->hide();

    QDir dir(QStandardPaths::locate(QStandardPaths::DocumentsLocation,QString(),QStandardPaths::LocateDirectory));
    if(dir.exists())
    {
        dir.mkpath("Time-Track/");
    }


    automatic = false;
    read();
    ui->connect->setEnabled(false);
    pingConnection();

}

ConnectionForm::~ConnectionForm()
{
    delete ui;
}

void ConnectionForm::loadConnection(bool s){

    if(s){
        setError("Valid");
        ui->connect->setEnabled(true);
    }
    else{
        setError("Invalid");
        ui->connect->setEnabled(false);
    }
    qDebug()<<"here";
}
/* Threaded ping operation to test the validity of an ip  */
void ConnectionForm::pingConnection(){

    ui->connect->setEnabled(false);

    QThread* thread = new QThread(this);
    Work* worker = new Work;
    worker->connection = ui->ipEdit->text();
    worker->moveToThread(thread);

    connect(thread, SIGNAL(finished()), worker, SLOT(deleteLater()));
    connect(thread, SIGNAL(started()), worker, SLOT(ping()));

    connect(worker, SIGNAL(progress(int)), this->ui->progress , SLOT(setValue(int)));

    connect(worker, SIGNAL(done(bool)),this,SLOT(loadConnection(bool)));


    thread->start();
    thread->setPriority(QThread::HighestPriority);

}
/* Exporting the saved data */
void ConnectionForm::write(){
    QFile file(QStandardPaths::locate(QStandardPaths::DocumentsLocation,QString(),QStandardPaths::LocateDirectory)+"Time-Track/Connection.txt");
    if (!file.open(QFile::WriteOnly | QFile::Text))
    {

        qDebug()<<"write monkey" << file.fileName();
        return;
    }
    QTextStream out(&file);
    out<<database<<" "<<port<<" "<<username<<" "<<password<<" "<<ip<<" ";
    out<<"1 ";


    file.flush();
    file.close();
}
/* Importing the saved data */
void ConnectionForm::read(){
    QFile file(QStandardPaths::locate(QStandardPaths::DocumentsLocation,QString(),QStandardPaths::LocateDirectory)+"Time-Track/Connection.txt");
    if (!file.open(QFile::ReadOnly | QFile::Text))
    {
        qDebug()<<"read monkey" << file.fileName();
        return;
    }

    QTextStream in(&file);
    QString text = in.readAll();
    qDebug()<<text.split(" ").length();
    if( text.split(" ").length() == 6)
    {
        ip =text.split(" ")[4];
        ui->databaseEdit->setText(text.split(" ")[0]);
        ui->portEdit->setText(text.split(" ")[1]);
        ui->usernameEdit->setText(text.split(" ")[2]);
        ui->passwordEdit->setText(text.split(" ")[3]);
        ui->ipEdit->setText(text.split(" ")[4]);
    }
    if( text.split(" ").length() == 7)
    {
         ip =text.split(" ")[4];
        ui->databaseEdit->setText(text.split(" ")[0]);
        ui->portEdit->setText(text.split(" ")[1]);
        ui->usernameEdit->setText(text.split(" ")[2]);
        ui->passwordEdit->setText(text.split(" ")[3]);
        ui->ipEdit->setText(text.split(" ")[4]);
        automatic = text.split(" ")[5].toInt();
        qDebug()<<ui->ipEdit->text()<<automatic;
    }

    file.close();
}
void ConnectionForm::auto_connect(){
    if(automatic){
        emit finished();
        this->hide();
    }
    else
        this->show();
}
void ConnectionForm::setError(QString x){
    ui->error->show();
    ui->error->setText(x);
}

/* Getter methods for the five elements of a connection */
QString ConnectionForm::getIp() const
{
    return ip;
}
QString ConnectionForm::getPassword() const
{
    return password;
}
QString ConnectionForm::getUsername() const
{
    return username;
}
QString ConnectionForm::getPort() const
{
    return port;
}
QString ConnectionForm::getDatabase() const
{
    return database;
}

void ConnectionForm::on_databaseEdit_textChanged(const QString &arg1)
{
    database = arg1;
}
void ConnectionForm::on_portEdit_textChanged(const QString &arg1)
{
    port = arg1;
}
void ConnectionForm::on_usernameEdit_textChanged(const QString &arg1)
{
    username = arg1;
}
void ConnectionForm::on_passwordEdit_textChanged(const QString &arg1)
{
    password = arg1;
}
void ConnectionForm::on_ipEdit_textChanged(const QString &arg1)
{
    ip = arg1;
    ui->connect->setEnabled(false);
    setError("Press ? to validate");
}
void ConnectionForm::on_testConnection_clicked()
{
    pingConnection();
}
void ConnectionForm::on_connect_clicked()
{
    if(ui->databaseEdit->text() == "")
        setError("Please enter a database");
    else if(ui->portEdit->text() == "")
        setError("Please enter a port");
    else if(ui->usernameEdit->text() == "")
        setError("Please enter a username");
    else if(ui->passwordEdit->text() == "")
        setError("Please enter a password");
    else if(ui->ipEdit->text() == "")
        setError("Please enter a IP");
    else
    {
        write();
        emit finished();

    }
}
