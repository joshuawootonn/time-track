#include "connectionform.h"
#include "ui_connectionform.h"

ConnectionForm::ConnectionForm(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ConnectionForm)
{
    ui->setupUi(this);
    ui->Conn->addItem("192.168.0.10");
    ui->Conn->addItem("192.168.41.187");

}

ConnectionForm::~ConnectionForm()
{
    delete ui;
}
QString ConnectionForm::getConnectionName(){
    return ui->Conn->currentText();
}

void ConnectionForm::on_buttonBox_accepted()
{
    emit finished();
    this->close();
}

void ConnectionForm::on_buttonBox_rejected()
{
    this->close();
}
