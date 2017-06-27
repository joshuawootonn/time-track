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

    ui->label->hide();
    automatic = false;
    read();
    ui->connect->setEnabled(false);
    pingConnection();

}

ConnectionForm::~ConnectionForm()
{
    delete ui;
}
QString ConnectionForm::getConnectionName(){
    return address;
}
void ConnectionForm::loadConnection(bool s){
    if(s)
        ui->connect->setEnabled(true);
    else
        ui->connect->setEnabled(false);



}

void ConnectionForm::pingConnection(){

    ui->connect->setEnabled(false);

    QThread* thread = new QThread(this);
    Work* worker = new Work;

    worker->moveToThread(thread);

    connect(thread, SIGNAL(finished()), worker, SLOT(deleteLater()));
    connect(thread, SIGNAL(started()), worker, SLOT(ping()));

    connect(worker, SIGNAL(progress(int)), this->ui->progress , SLOT(setValue(int)));

    connect(worker, SIGNAL(done(bool)),this,SLOT(loadConnection(bool)));


    thread->start();
    thread->setPriority(QThread::HighestPriority);

}
void ConnectionForm::write(){
    QFile file(QStandardPaths::locate(QStandardPaths::DocumentsLocation,QString(),QStandardPaths::LocateDirectory)+"Time-Track/Connection.txt");
    if (!file.open(QFile::WriteOnly | QFile::Text))
    {
        //QDir::mkpath(QStandardPaths::locate(QStandardPaths::DocumentsLocation,QString(),QStandardPaths::LocateDirectory)+"Time-Track/Connection.txt");
        QDir dir(QStandardPaths::locate(QStandardPaths::DocumentsLocation,QString(),QStandardPaths::LocateDirectory));
        dir.mkpath("Time-Track/");
    }
    QTextStream out(&file);
    out<<address<<" ";
    if(ui->save->isChecked())
    {
        out<<"1 ";
    }

    file.flush();
    file.close();
}
void ConnectionForm::read(){
    QFile file(QStandardPaths::locate(QStandardPaths::DocumentsLocation,QString(),QStandardPaths::LocateDirectory)+"Time-Track/Connection.txt");
    if (!file.open(QFile::ReadOnly | QFile::Text))
    {
        ui->label->show();
        qDebug()<<"read monkey" << file.fileName();
        return;
    }

    QTextStream in(&file);
    QString text = in.readAll();
    if( text.split(" ").length() == 2)
    {
        ui->edit->setText(text.split(" ")[0]);
    }
    if( text.split(" ").length() == 3)
    {
        address = text.split(" ")[0];
        ui->edit->setText(address);
        automatic = text.split(" ")[1].toInt();
        qDebug()<<ui->edit->text()<<automatic;
    }

    file.close();
}
void ConnectionForm::on_connect_clicked()
{
    address = ui->edit->text();
    write();
    emit finished();
    this->hide();
}
void ConnectionForm::auto_connect(){
    if(automatic){
        address = ui->edit->text();
        emit finished();
        this->hide();
    }
    else
        this->show();

}
void ConnectionForm::on_edit_returnPressed()
{
    pingConnection();
}
